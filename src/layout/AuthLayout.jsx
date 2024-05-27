import "../assets/css/all.min.css";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/customStyle.css";

export default function AuthLayout({ children, layout }) {
  if (layout == 'profile') {
    return (
      <>
        <div className="container">
          {children}
        </div>
      </>
    );
  }
  return (
    <div className="bg-gradient-primary d-flex align-items-center" style={{height: '100vh'}}>
      <div className="container">
        {children}
      </div>
    </div>
  );
}
