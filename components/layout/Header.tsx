import React from 'react'
import SearchBox from '../common/SearchBox'
import UserTab from './UserTab'

export default function Header() {
  return (
    <header className='w-full py-2 px-6  flex-between border-b border-grey'>
      <SearchBox />
      <UserTab />
    </header>
  )
}
