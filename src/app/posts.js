import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map(fileName => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      ...data,
      slug: fileName.replace('.md', '')
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
