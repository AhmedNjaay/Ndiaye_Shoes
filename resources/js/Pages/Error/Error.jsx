import { Head } from "@inertiajs/react";

export default function Error({ status }) {
  console.log("Status: ", status);
  const title = {
    503: '503 Service Unavailable',
    500: '500 Server Error',
    404: '404 Page Not Found',
    403: '403 Forbidden',
  }[status]

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[status]

  return (
    <div className="flex flex-col items-center flex-wrap justify-center h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="images/icon.png" />
      </Head>
      <h1 className="text-2xl text-center font-medium">{title}</h1>
      <p className="text-lg mx-2 text-center">{description}</p>
    </div>
  )
}