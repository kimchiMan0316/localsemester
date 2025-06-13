import MyEditor from "../../../components/form/postForm/postForm";

export const LocalSemesterCreatePost = () => {
  return (
    <>
      <div>
        <MyEditor url="/semester" exitPath="/localSemester" post={true} />
      </div>
    </>
  );
};
