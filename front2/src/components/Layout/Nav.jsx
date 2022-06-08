import Link from "next/link"
import styled from "styled-components";


const Nav = () => {
    return(
        <>
            <nav className="flex justify-center space-x-4" >
                <Link href="/">
                    <A className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">홈</A >
                </Link>
                <Link href="/MakeRoom">
                    <A className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" >방만들기</A >
                </Link>

                <Link href="/RoomList">
                    <A className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">방 목록</A>
                </Link>
            </nav>
        </>
    );
}

const A = styled.a`
  margin-right: 10px;
  margin-left: 10px;
  
  cursor: pointer;
  
`
export default Nav;