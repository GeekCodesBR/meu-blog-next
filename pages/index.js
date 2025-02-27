import Link from 'next/link';
import { getSortedPosts } from '../src/app/posts';

export async function getStaticProps() {
  const posts = getSortedPosts();
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>🚀 Meu Blog Next.js</h1>
      <ul>
        {posts.map(({ slug, title, date }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`} legacyBehavior >
              <a>{title} - {date}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
