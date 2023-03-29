import MyNavbar from "./MyNavbar";

const Layout = ({children}) => {
    return (
      <div>
        <div>
          <MyNavbar />
        </div>
        <main>{children}</main>
      </div>
    );
}

export default Layout