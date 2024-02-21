import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '@/components/Header';

import { canSSRAuth } from '@/utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';

import { setupAPIClient } from '@/services/api';

import { toast } from 'react-toastify';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Contact({ categoryList }: CategoryProps){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    //Para selecionar uma nova categoria na lista
    function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
        console.log("Categoria selecionada: ", event.target.value)
        setCategorySelected(Number(event.target.value));
    }

    async function handleRegiter(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error('Preencha todos os campos');
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data);

            toast.success('Contato cadastrado com sucesso!');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao cadastrar contato');
        }       

        setName('');
        setPrice('');
        setDescription('');
        setAvatarUrl('');
        setImageAvatar(null);
        
    }

    return (
        <>
            <Head>
                <title>Novo Contato - Agregador de Contatos</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Cadastrar Novo Contato</h1>

                    <form className={styles.form} onSubmit={handleRegiter}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={35} color='#000000' />
                            </span>

                            <input type="file" accept='image/png, image/jpeg, image/jpg'
                                onChange={handleFile} />

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto Referencia"
                                    width={150}
                                    height={150}
                                />
                            )}

                        </label>


                        <select value={categorySelected} onChange={handleChangeCategory} >
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input type="text"
                            placeholder="Digite o Nome do Contato"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                        />
                        <input type="text"
                            placeholder="Valor"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder="Descrição"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button type="submit" className={styles.button}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    // @ts-ignore
    const apiClient = setupAPIClient(ctx); //deixei erro do type por enquanto

    const response = await apiClient.get('/category');

    //console.log(response.data); Para verificar a lista de categorias.

    return {
        props: {
            categoryList: response.data
        }
    }
});