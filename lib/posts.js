import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import fetch from 'node-fetch';
const base64 = require('js-base64').Base64

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

// ファイル名からidを取得する関数
export async function getAllPostIds() {

  // const fileNames = fs.readdirSync(postsDirectory);
  // 下のreturnは下記のコメントアウトしている部分に生成してreturnしている。
  // 生成するオブジェクトには必ずparamsというkeyを持たせること。持たせないとgetStaticPathsが失敗する。
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  // 外部APIから情報を取得する
  const repoUrl = "https://api.github.com/repos/kida-works/Nextjs-study-part01/contents/posts"
  const response = await fetch(repoUrl)
  const files = await response.json()
  const filesNames = files.map(file=> file.name)
  
  return filesNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// idに基づいたブログの投稿データをreturnする。
// export function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents);

//   // Combine the data with the id
//   return {
//     id,
//     ...matterResult.data,
//   };
// }
// ↓上のコードを下に変更した。
export async function getPostData(id) {
  // const fullPath = path.join(postsDirectory, `${id}.md`);
  // const fileContents = fs.readFileSync(fullPath, 'utf8');
  // ↓外部ファイルからの取得に変更
  const repoUrl = `https://api.github.com/repos/kida-works/Nextjs-study-part01/contents/posts/${id}.md`
  const response = await fetch(repoUrl)
  const file = await response.json()
  const fileContents = base64.decode(file.content)




  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
// remark()は、非同期なのでasync、awaitをつけた
