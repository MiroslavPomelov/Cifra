'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack, useToast, HStack, Image } from '@chakra-ui/react';
import { apiService, Shop } from '../../../services/api';
import { useRouter } from 'next/navigation';

const ShopSettingsPage: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  const [form, setForm] = useState({ name: '', address: '', description: '', phone: '' });
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      toast({ title: 'Требуется вход', description: 'Авторизуйтесь как магазин', status: 'warning' });
      router.push('/login');
      return;
    }
    const shopRaw = typeof window !== 'undefined' ? localStorage.getItem('shop') : null;
    const fallbackFromToken = () => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const payload = JSON.parse(jsonPayload);
        const id = payload?.sub;
        const email = payload?.email;
        if (id) {
          const minimal: any = { id, email, name: '', address: '', description: '', phone: '' };
          setShop(minimal);
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:80'}/shops/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then(async (r) => (r.ok ? r.json() : null)).then((data) => {
            if (data) {
              setShop(data);
              setForm({
                name: data.name || '',
                address: data.address || '',
                description: data.description || '',
                phone: data.phone || '',
              });
            }
          }).catch(() => {});
          setForm((prev) => ({ ...prev }));
        }
      } catch {}
    };
    if (shopRaw) {
      try {
        const parsed: Shop = JSON.parse(shopRaw);
        setShop(parsed);
        setForm({
          name: parsed.name || '',
          address: parsed.address || '',
          description: parsed.description || '',
          phone: parsed.phone || '',
        });
      } catch {
        fallbackFromToken();
      }
    } else {
      fallbackFromToken();
    }
  }, [router, toast]);

  const handleUpload = async (file: File) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      toast({ title: 'Нет токена', status: 'warning' });
      return;
    }
    try {
      setUploading(true);
      const { url } = await apiService.uploadShopImage(file, token);
      setLogoUrl(url);
      toast({ title: 'Изображение загружено', status: 'success' });
    } catch (err: any) {
      toast({ title: 'Ошибка загрузки', description: err?.response?.data?.message || err.message, status: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!shop) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      toast({ title: 'Нет токена', status: 'warning' });
      return;
    }
    try {
      setSaving(true);
      const payload: any = { ...form };
      if (logoUrl) payload.logoUrl = logoUrl;
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:80'}/shops/${shop.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      }).then(async (r) => {
        if (!r.ok) throw new Error((await r.json())?.message || 'Ошибка сохранения');
        return r.json();
      });
      const updated = { ...shop, ...payload } as Shop;
      setShop(updated);
      localStorage.setItem('shop', JSON.stringify(updated));
      toast({ title: 'Данные обновлены', status: 'success' });
      router.push('/shop/dashboard');
    } catch (err: any) {
      toast({ title: 'Ошибка', description: err.message, status: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box minH="100vh" bg="black" pt="80px">
      <Container maxW="4xl" py={8}>
        <Heading color="white" mb={6}>Настройки магазина</Heading>
        <VStack spacing={4} align="stretch" bg="rgba(255,255,255,0.05)" border="1px solid rgba(255,255,255,0.1)" borderRadius="xl" p={6}>
          <FormControl>
            <FormLabel color="gray.300">Название</FormLabel>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} color="white" />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.300">Адрес</FormLabel>
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} color="white" />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.300">Телефон</FormLabel>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} color="white" />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.300">Описание</FormLabel>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} color="white" />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.300">Логотип/изображение</FormLabel>
            <HStack>
              <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} color="white" />
            </HStack>
            {logoUrl && (
              <Box mt={3}>
                <Image src={logoUrl} alt="logo" maxH="120px" objectFit="cover" borderRadius="md" />
              </Box>
            )}
          </FormControl>
          <HStack>
            <Button onClick={handleSave} isLoading={saving} bgGradient="linear(to-r, pink.400, purple.500)" color="white">Сохранить</Button>
            <Button variant="outline" onClick={() => router.push('/shop/dashboard')}>Отмена</Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ShopSettingsPage;


