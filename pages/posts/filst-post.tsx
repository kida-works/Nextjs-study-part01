import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';

export default function FilstPost() {
  return (
    <Layout test>
      <Head>
        <title>Shiro</title>
        {/* <meta name="description" content="Generated by create next app" />
        <meta property='' />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <h1>Filst post</h1>
      <Link href="/">
        <a>Bacl to Home</a>
      </Link>
    </Layout>
  )
}