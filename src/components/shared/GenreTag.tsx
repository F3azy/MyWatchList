import { Tag, TagLabel } from "@chakra-ui/react";
import React from "react";

const GenreTag = ({
  children,
  _variant,
  _onClick,
}: {
  children: React.ReactNode;
  _variant: string;
  _onClick?: () => void;
}) => {
  return (
    <Tag
      variant={_variant}
      onClick={_onClick}
    >
      <TagLabel>{children}</TagLabel>
    </Tag>
  );
};

export default GenreTag;
