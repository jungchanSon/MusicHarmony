import Link from "next/link"


const Nav = () => {
    // let path = window.location.pathname;

    return(
        <>
            <nav className="flex justify-center space-x-4">
                <Link href="/">
                    <a className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">홈</a >
                </Link>
                <Link href="/MakeRoom">
                    <a className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">방만들기</a >
                </Link>

                <Link href="/RoomList">
                    <a className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">방 목록</a>
                </Link>
            </nav>
        </>
    );
}

export default Nav;