import Image from 'next/image'
import styles from './page.module.css'
import CommentTable from '../../components/commentTable';

export default function Home() {
  return (
    <div>
      <h1>Your Application Title</h1>
      <CommentTable />
    </div>
  );
};