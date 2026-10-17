import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/perfi-pay',
    permanent: true,
  },
})

export default function PerfiPayRedirect() {
  return null
}
