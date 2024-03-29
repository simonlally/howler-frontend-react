import React, { useState } from "react";
import { Form, Button, Card, Header } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { GET_POSTS_QUERY } from "../util/graphql";

export default function PostForm(props) {
  const [values, setValues] = useState({
    body: ""
  });

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("okokokok");
    createPost();
  };

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: GET_POSTS_QUERY, data });
      values.body = "";
    }
  });

  return (
    <>
      <Card style={{ border: "1px solid #53e2f5" }} fluid>
        <Card.Content>
          <Form onSubmit={onSubmit}>
            <Header as="h3" textAlign="left">
              Post a new howl!
            </Header>
            <Form.Field>
              <Form.TextArea
                rows={2}
                placeholder="hello!"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
              />
              <Button color="blue" type="submit">
                submit
              </Button>
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
