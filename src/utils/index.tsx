export const createComment = (text: string, parentId?: string) => {
    const now = new Date();
    return {
      id: now.getTime().toString(),
      parent_id: parentId,
      author: {
        name: "Srdjan",
        picture: "img/ivan.png",
      },
      text: text,
      timestamp: now.getTime(),
    };
  };
  