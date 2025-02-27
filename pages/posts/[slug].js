import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map(fileName => ({
    params: { slug: fileName.replace('.md', '') }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      title: data.title,
      date: data.date,
      contentHtml
    }
  };
}

export default function Post({ title, date, contentHtml }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
