import Layout from "@/components/layout";
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from "next/head";
import Date from "@/components/date";

export async function getStaticPaths() {
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false //Ne genere aucun path non present ici
            //true: generera lors d'une requete un path non present et le gardera pour l'envoyer a chaque req
            //blocking: server-side-rendering the new paths
    }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1>{postData.title}</h1>
                <br />
                <div>
                    <Date dateString={postData.date} />
                </div>
                <br/>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    );
}