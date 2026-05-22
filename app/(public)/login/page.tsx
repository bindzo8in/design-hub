import React, { Suspense } from 'react'
import LoginPage from './client'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}

export default Page