import Styles from "./layout.module.css";

export default function Layout ({ children }) {
  return <div className={Styles.conteiner}>{children}</div>
}