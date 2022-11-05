type Nominee = {
  name: string;
  post: string;
  votes: number;
  id: string;
  postNo: Number;
  user: string;
  image: string;
};

export type UpdateNomineeData = {
  name: string;
  position: string;
  user: string;
  id: string
}

export default Nominee;
