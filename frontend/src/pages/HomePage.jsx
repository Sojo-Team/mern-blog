import Header from '@/components/common/Header'
import { fetchBlogsService } from '@/services/blog.service'
import { useInfiniteQuery } from '@tanstack/react-query'

const HomePage = () => {
  const { data } = useInfiniteQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogsService,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page >= lastPage.totalPages) {
        return null
      }
      return lastPage.page + 1
    },
    select: data => ({
      ...data,
      pages: data.pages.flat().map(page => page.blogs),
    }),
  })

  return (
    <div>
      <Header />
      <div className='mt-10'>
        {data?.pages?.flat().map(blog => (
          <div key={blog._id}>
            <h1>{blog.title}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}
export default HomePage
