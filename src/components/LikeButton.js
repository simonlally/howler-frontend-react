import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Icon, Button, Label } from "semantic-ui-react";

export default function LikeButton({ user, post: { id, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal" size="small">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" size="small" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button size="small" as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likes.length}
      </Label>
    </Button>
  );
}

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
    }
  }
`;
