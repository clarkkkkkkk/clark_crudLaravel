import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Megaphone, Terminal } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
}

interface Pageprops {
    flash: {
        message?: string
    }
    products: Product[]
}

export default function Index() {

    const { products, flash } = usePage().props as Pageprops;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete product - ${id}. ${name}?`)) {
            destroy(`/products/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className='m-4'>
                <Link href="/products/create"> {/* I hard coded this one, the route() function isn't working */}
                    <Button>Create a Product</Button>
                </Link>
            </div>

            <div className='m-4'>
                <div>
                    {flash.message && (
                        <Alert>
                            <Megaphone className='h-4 w-4' />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {products.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-center">
                                        <Button disabled={processing} onClick={() => handleDelete(product.id, product.name)} className='bg-red-500 hover:bg-red-700'>Delete</Button>

                                        <Link href={`/products/${product.id}/edit`}>
                                            <Button className="bg-green-500 hover:bg-green-700">Update</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
