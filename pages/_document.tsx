import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const MyDocument: any = () => {
    const getInitialProp = async (ctx: any) => {
        const props = await Document.getInitialProps(ctx);
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
            })
            return {
                ...props,
                styles: <>
                    {props.styles}{sheet.getStyleElement()}
                </>
            }
        } catch (error) {

        }


    }
    return <Html>
        <Head></Head>
        <Main></Main>
        <NextScript></NextScript>
    </Html>
}

export default MyDocument;