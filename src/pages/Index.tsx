import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  limited?: boolean;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: 'Алмазная зачарованная броня', price: 15, category: 'armor', description: 'Полный комплект зачарованной алмазной брони', stock: 10 },
  { id: 2, name: 'Обычная алмазная броня', price: 10, category: 'armor', description: 'Полный комплект алмазной брони без чар', stock: 15 },
  { id: 3, name: 'Пак Нуба для ПВП', price: 5, category: 'packs', description: 'Кожаная броня + деревянный меч', stock: 50 },
  { id: 4, name: 'Пак ПРО', price: 100, category: 'packs', description: 'Алмазная броня, стак алмазов, 16 эндер перлов, алмазная кирка и топор', stock: 8 },
  { id: 5, name: 'Привилегия ТАНОС', price: 200, category: 'privileges', description: 'Управление временем суток + помощь админа', stock: 5 },
  { id: 6, name: 'Админка на день', price: 150, category: 'privileges', description: 'Админ права на 24 часа', limited: true, stock: 1 },
  { id: 7, name: 'Админка навсегда', price: 600, category: 'privileges', description: 'Админ права навсегда', stock: 3 },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const { toast } = useToast();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const limitedProducts = products.filter(p => p.limited);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setShowPhoneDialog(true);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+79505244676');
    toast({
      title: '📋 Номер скопирован!',
      description: 'Позвоните нам для оформления покупки',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.03) 2px, hsl(var(--primary) / 0.03) 4px)',
        }}></div>
        
        <header className="relative border-b border-primary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold neon-glow font-orbitron">MIAMORE SHOP</h1>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-lg px-4 py-2 border-primary text-primary">МИАМОРЕ</Badge>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-6xl font-bold mb-4 neon-glow font-orbitron">
                MIAMORE SHOP
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Лучший магазин для майнкрафт сервера
              </p>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary px-6 py-3 rounded-lg neon-border">
                <Icon name="Phone" className="text-primary" size={20} />
                <span className="text-lg font-bold text-primary">+7 950 524 46 76</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {limitedProducts.length > 0 && (
        <section className="py-12 bg-card/50 backdrop-blur-sm border-y border-primary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold mb-2 neon-glow font-orbitron flex items-center gap-3">
                  <Icon name="Zap" className="text-secondary" size={32} />
                  ОГРАНИЧЕННЫЕ ТОВАРЫ
                </h3>
                <p className="text-muted-foreground">Успей купить, пока не разобрали!</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {limitedProducts.map((product) => (
                <Card key={product.id} className="bg-card/80 backdrop-blur border-primary/50 hover:border-primary transition-all duration-300 card-glow animate-fade-in">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge className="bg-secondary text-secondary-foreground mb-2">
                        <Icon name="Flame" size={14} className="mr-1" />
                        ОГРАНИЧЕНО
                      </Badge>
                      <Badge variant="outline" className="border-primary text-primary">
                        Осталось: {product.stock}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-orbitron">{product.name}</CardTitle>
                    <CardDescription className="text-base">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary font-orbitron">{product.price}₽</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                      onClick={() => handleBuyClick(product)}
                    >
                      <Icon name="ShoppingBag" className="mr-2" size={18} />
                      Купить сейчас
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-primary text-primary-foreground neon-border' : 'border-primary/50 hover:border-primary'}
            >
              Все товары
            </Button>
            <Button
              variant={selectedCategory === 'armor' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('armor')}
              className={selectedCategory === 'armor' ? 'bg-primary text-primary-foreground neon-border' : 'border-primary/50 hover:border-primary'}
            >
              <Icon name="Shield" className="mr-2" size={16} />
              Броня
            </Button>
            <Button
              variant={selectedCategory === 'packs' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('packs')}
              className={selectedCategory === 'packs' ? 'bg-primary text-primary-foreground neon-border' : 'border-primary/50 hover:border-primary'}
            >
              <Icon name="Package" className="mr-2" size={16} />
              Паки
            </Button>
            <Button
              variant={selectedCategory === 'privileges' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('privileges')}
              className={selectedCategory === 'privileges' ? 'bg-primary text-primary-foreground neon-border' : 'border-primary/50 hover:border-primary'}
            >
              <Icon name="Crown" className="mr-2" size={16} />
              Привилегии
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="bg-card/80 backdrop-blur border-primary/30 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="border-accent text-accent">
                      В наличии: {product.stock}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-orbitron">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary font-orbitron">{product.price}₽</div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                    onClick={() => handleBuyClick(product)}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={18} />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
        <DialogContent className="bg-card border-primary neon-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron neon-glow flex items-center gap-2">
              <Icon name="Phone" className="text-green-500" size={24} />
              Оформление покупки
            </DialogTitle>
            <DialogDescription className="text-base">
              Позвоните по указанному номеру для покупки товара
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedProduct && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Выбранный товар:</div>
                <div className="text-xl font-bold font-orbitron">{selectedProduct.name}</div>
                <div className="text-2xl text-primary font-bold font-orbitron mt-2">{selectedProduct.price}₽</div>
              </div>
            )}
            <div className="bg-green-600/20 border-2 border-green-500 rounded-lg p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2">Позвоните по номеру:</div>
              <div className="text-3xl font-bold text-green-500 font-orbitron mb-4">
                +7 950 524 46 76
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                onClick={copyPhone}
              >
                <Icon name="Copy" className="mr-2" size={18} />
                Скопировать номер
              </Button>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              <Icon name="Clock" className="inline mr-1" size={14} />
              Работаем с 10:00 до 22:00 МСК
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="relative border-t border-primary/30 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 neon-glow font-orbitron">MIAMORE SHOP</h3>
              <p className="text-muted-foreground">Магазин для майнкрафт сервера</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 950 524 46 76</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Категории</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Броня</li>
                <li>Паки</li>
                <li>Привилегии</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/30 mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 MIAMORE SHOP. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;