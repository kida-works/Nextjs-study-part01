// getStaticPathsを使って表示するページ
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }:any) {
  return (
    <Layout test>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
// fallbackをfalseに設定すると404ページを表示する。
// trueを指定すると準備しておいた、存在しないことを表示することができる。（任意のページの表示）


export async function getStaticProps({ params }:any) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}