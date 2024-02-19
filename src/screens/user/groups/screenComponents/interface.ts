export type TgroupPost = {
  content: string;
  groupId: string;
  mediaId?: string;
  title: string;
};
export type IPostModal = {
  visible: boolean;
  onRequestClose: () => void;
  setGroupPosts: (item: IGroupPost) => void;
  avatar?: string;
  name?: string;
  groupId: string;
};
export type IComments = {
  _id: string;
  content: string;
  post: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    role: string;
    avatar?: string;
  } | null;

  createdAt: string;
  updatedAt: string;
};
export type ILikes = {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  role: string;
  country: string;
  state: string;
  avatar: string;
};

export type IGroupPost = {
  url: string;
  _id: string;
  title: string;
  content: string;
  group: string;
  postCreator: {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    role: string;
    country: string;
    state: string;
    avatar?: string;
  };
  isGroupAdminApproved: boolean;
  comments: IComments[];
  likes: [ILikes];
  media: {
    _id: string;
    fileKey: string;
    encoding: string;
    originalName?: string;
    mimetype: string;
    s3PrivateUrl: string;
    s3PublicUrl: string;
    size: string;
    bucketName: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: Date;
  updatedAt: string;
};
