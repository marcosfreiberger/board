import { useState } from 'react'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnection'

import styles from './styles.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import rocketImg from '../../../public/images/rocket.svg'

import { PayPalButtons } from "@paypal/react-paypal-js";
// CLIENT ID = AQzNABUwN16txF2ncoB61gpQLLB9HOs51c1mHofgV93WOiIG7lfMIGzT7Ey65TqY7yFwatSzzc4sqM-V

//<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface DonateProps {
  user: {
    id: string;
    nome: string;
    image: string;
  }
}

export default function Donate({ user }: DonateProps) {
  const [vip, setVip] = useState(false);

  async function handleSaveDonate() {
    await firebase.firestore().collection('users')
      .doc(user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: user.image
      })
      .then(() => {
        setVip(true);
      })
  }

  return (
    <>
      <Head>
        <title>Ajude a plataforma board ficar online!</title>
      </Head>
      <main className={styles.container}>
        <Image src={rocketImg} alt="Seja Apoiador" />

        {vip && (
          <div className={styles.vip}>
            <Image width={50} height={50} src={user.image} alt="Foto de perfil do usuario" />
            <span>Parabés você é um novo apoiador!</span>
          </div>
        )}

        <h1>Seja um apoiador deste projeto 🏆</h1>
        <h3>Contribua com apenas <span>R$ 1,00</span></h3>
        <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: "1",
                },
              }],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              console.log(`Compra aprovada: ${name}`);
              handleSaveDonate();
            });
          }}
        />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    id: session?.id,
    nome: session?.user.name,
    image: session?.user.image,
  }

  return {
    props: {
      user
    }
  }
}