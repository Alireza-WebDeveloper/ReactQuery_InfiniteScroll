import Course from '../../Components/Course';
import useGetCourse from '../../Hook/useGetCourse';
import Loading from '../../Utils/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
const HomePage = () => {
  // Fetch course data using a custom hook
  const { fetchNextPage, data, isLoading, isFetchingNextPage, hasNextPage } =
    useGetCourse();

  // Display a loading spinner while fetching data
  if (isLoading) {
    return <Loading />;
  }

  // Destructure data into pages and pageParams
  const { pages, pageParams }: any = data;

  // Flatten the array of course pages into a single array
  const courses: any[] = [].concat(...pages);

  // Function to handle loading the next page of courses
  const handleNextPage = () => {
    fetchNextPage();
  };

  return (
    <div className="flex flex-col space-y-2">
      <InfiniteScroll
        dataLength={courses ? courses.length : 0}
        next={handleNextPage}
        hasMore={hasNextPage ? true : false}
        loader={<p>loading...</p>}
      >
        <>
          <Course courses={courses} />
          {isFetchingNextPage && <Loading />}
        </>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
