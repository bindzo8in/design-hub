import React, { Suspense } from 'react'
import AuthErrorPage from './client'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorPage />
    </Suspense>
  )
}

export default Page