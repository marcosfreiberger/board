import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnection'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';

import Head from 'next/head'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash, FiX } from 'react-icons/fi'
import styles from './task.module.scss'

type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
}

interface TaskListProps {
  data: string;
}

export default function Task({ data }: TaskListProps) {

  const task = JSON.parse(data) as Task;

  return (
    <>
      <Head>
        <title>Detalhes da sua tarefa</title>
      </Head>
      <article className={styles.container}>
        <div className={styles.actions}>
          <div>
            <FiCalendar size={30} color="#ffb800" />
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.tarefa}</p>
      </article>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { id } = params;
  const session = await getSession({ req });

  if (!session?.vip) {
    return {
      redirect: {
        destination: '/board',
        permanent: false
      }
    }
  }

  const data = await firebase.firestore().collection('tarefas')
    .doc(String(id))
    .get()
    .then((item) => {
      const data = {
        id: item.id,
        created: item.data().created,
        createdFormated: format(item.data().created.toDate(), 'dd MMMM yyyy', { locale: ptBR }),
        tarefa: item.data().tarefa,
        userId: item.data().userId,
        nome: item.data().nome,
      }

      return JSON.stringify(data);
    })
    .catch(() => {
      return {};
    })

  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        destination: '/board',
        permanent: false
      }
    }
  }

  return {
    props: {
      data
    }
  }
}