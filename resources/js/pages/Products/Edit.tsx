import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"
import { useForm } from '@inertiajs/react'
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleAlert } from 'lucide-react';

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
}

interface Props {
    product: Product
}

export default function Edit({ product }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description
    })

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Product', href: '/products/${products.id}/edit' }]}>
            <Head title="Update a New Product" />
            <div className='w-8/12 p-4'>
                {/* Display Error */}

                {Object.keys(errors).length > 0 && (
                    <Alert>
                        <CircleAlert />
                        <AlertTitle>Alert, alert!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleUpdate} className='space-y-4'>
                    <div className='gap-1.5'>
                        <Label htmlFor='product name'>Name</Label>
                        <Input placeholder='Products Name' value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product price'>Price</Label>
                        <Input placeholder='Price' value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product description'>Desciption</Label>
                        <Textarea placeholder='Description' value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>

                    <Button type='submit'>Update Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
