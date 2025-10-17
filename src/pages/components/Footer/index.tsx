import styles from "./index.module.less";

export default function Footer() {
  return (
    <div className={styles.beianFooter}>
      <div className={styles.beianFooter_beian}>
        <img src={"/beian.png"} />
        <a
          href='https://beian.mps.gov.cn/#/query/webSearch?code=33010602013871'
          rel='noreferrer'
          target='_blank'
        >
          浙公网安备33010602013871号
        </a>
      </div>
      <a href={"https://beian.miit.gov.cn"} target={"_blank"} rel='noreferrer'>
        浙ICP备2024117433号-2
      </a>
    </div>
  );
}
