import App from 'next/app';
import "antd/dist/antd.css";

const myApp = (props: any) => {
    const { Component } = props
    return <div><Component /></div>
}

export default myApp;
