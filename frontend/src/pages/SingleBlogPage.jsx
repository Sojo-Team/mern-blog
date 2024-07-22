import { fetchSingleBlogService } from '@/services/blog.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const SingleBlogPage = () => {
  const params = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['blog', params.blogId],
    queryFn: () => fetchSingleBlogService(params.blogId),
  })

  return (
    <div>{isLoading ? <div>Loading</div> : <>{JSON.stringify(data)}</>}</div>
  )
}
export default SingleBlogPage
