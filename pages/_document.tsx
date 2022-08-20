import Document, { Html, Head, Main, NextScript } from 'next/document';

const MyDocument: any = () => {
    const getInitialProp = async (ctx: any) => {
        const props = await Document.getInitialProps(ctx);

        return {
            ...props
        }
    }
    return <Html>
        <Head></Head>
        <Main></Main>
        <NextScript></NextScript>
    </Html>
}

export default MyDocument;