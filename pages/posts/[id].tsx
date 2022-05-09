// getStaticPathsを使って表示するページ
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }:any) {
  return (
    <Layout test>
     <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.text} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
// fallbackは存在しないURLを叩いた時どうするかの指定
// fallbackをfalseに設定すると404ページを表示する。
// trueを指定すると準備しておいた、存在しないことを表示することができる。（任意のページの表示）


export async function getStaticProps({ params }:any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}