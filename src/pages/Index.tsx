import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  limited?: boolean;
  discount?: number;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: 'Алмазная броня', price: 5000, category: 'armor', description: 'Полный комплект зачарованной алмазной брони', limited: true, discount: 20, stock: 3 },
  { id: 2, name: 'Незеритовый меч', price: 8000, category: 'weapons', description: 'Незеритовый меч с Острота V и Заговор огня II', limited: true, discount: 15, stock: 2 },
  { id: 3, name: 'Элитры', price: 12000, category: 'transport', description: 'Крылья для полёта с зачарованием Починка', stock: 5 },
  { id: 4, name: 'Набор строителя', price: 3500, category: 'resources', description: '10000 блоков камня, дерева и стекла', stock: 10 },
  { id: 5, name: 'Зелья силы x64', price: 2000, category: 'potions', description: 'Набор из 64 зелий силы II (8:00)', stock: 15 },
  { id: 6, name: 'Маяк + база', price: 15000, category: 'special', description: 'Полностью готовый маяк с базой из изумрудов', limited: true, discount: 10, stock: 1 },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const limitedProducts = products.filter(p => p.limited);

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
              <h1 className="text-4xl font-bold neon-glow font-orbitron">MYSTERYWORLD SHOP</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  Корзина
                </Button>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-6xl font-bold mb-4 neon-glow font-orbitron">
                МАГАЗИН MYSTERYWORLD
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Лучшие предметы для вашего выживания на сервере
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 neon-border animate-pulse-glow">
                <Icon name="Zap" className="mr-2" size={24} />
                Связаться с продавцом
              </Button>
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
                  <Icon name="Clock" className="text-secondary" size={32} />
                  ОГРАНИЧЕННЫЕ ПРЕДЛОЖЕНИЯ
                </h3>
                <p className="text-muted-foreground">Успей купить по выгодной цене!</p>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-card border border-primary/50 rounded-lg p-4 neon-border">
                  <div className="text-3xl font-bold text-primary font-orbitron">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-muted-foreground">ЧАСОВ</div>
                </div>
                <div className="bg-card border border-primary/50 rounded-lg p-4 neon-border">
                  <div className="text-3xl font-bold text-secondary font-orbitron">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-muted-foreground">МИНУТ</div>
                </div>
                <div className="bg-card border border-primary/50 rounded-lg p-4 neon-border">
                  <div className="text-3xl font-bold text-accent font-orbitron">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-muted-foreground">СЕКУНД</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {limitedProducts.map((product) => (
                <Card key={product.id} className="bg-card/80 backdrop-blur border-primary/50 hover:border-primary transition-all duration-300 card-glow animate-fade-in">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge className="bg-secondary text-secondary-foreground mb-2">
                        <Icon name="Flame" size={14} className="mr-1" />
                        -{product.discount}%
                      </Badge>
                      <Badge variant="outline" className="border-accent text-accent">
                        <Icon name="Package" size={14} className="mr-1" />
                        {product.stock} шт
                      </Badge>
                    </div>
                    <CardTitle className="font-orbitron">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary font-orbitron">
                        {Math.round(product.price * (1 - (product.discount || 0) / 100))}₽
                      </span>
                      <span className="text-lg text-muted-foreground line-through">{product.price}₽</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
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
          <h3 className="text-4xl font-bold mb-8 text-center neon-glow font-orbitron">КАТАЛОГ ТОВАРОВ</h3>
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-7 mb-8 bg-card/50 border border-primary/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Grid3x3" className="mr-2" size={18} />
                Все
              </TabsTrigger>
              <TabsTrigger value="armor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Shield" className="mr-2" size={18} />
                Броня
              </TabsTrigger>
              <TabsTrigger value="weapons" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Sword" className="mr-2" size={18} />
                Оружие
              </TabsTrigger>
              <TabsTrigger value="transport" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Plane" className="mr-2" size={18} />
                Транспорт
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Box" className="mr-2" size={18} />
                Ресурсы
              </TabsTrigger>
              <TabsTrigger value="potions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Droplet" className="mr-2" size={18} />
                Зелья
              </TabsTrigger>
              <TabsTrigger value="special" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Sparkles" className="mr-2" size={18} />
                Особое
              </TabsTrigger>
            </TabsList>
            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-card/80 backdrop-blur border-primary/30 hover:border-primary transition-all duration-300 hover:card-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="border-primary text-primary">
                          {product.category === 'armor' && 'Броня'}
                          {product.category === 'weapons' && 'Оружие'}
                          {product.category === 'transport' && 'Транспорт'}
                          {product.category === 'resources' && 'Ресурсы'}
                          {product.category === 'potions' && 'Зелья'}
                          {product.category === 'special' && 'Особое'}
                        </Badge>
                        <Badge variant="outline" className="border-accent text-accent">
                          <Icon name="Package" size={14} className="mr-1" />
                          {product.stock}
                        </Badge>
                      </div>
                      <CardTitle className="font-orbitron">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary font-orbitron">{product.price}₽</div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary/20 border border-primary hover:bg-primary hover:text-primary-foreground">
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-8 text-center neon-glow font-orbitron">ИНСТРУКЦИЯ ПО ПОКУПКЕ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4 neon-border">
                <Icon name="MessageSquare" size={40} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2 font-orbitron">1. Свяжитесь</h4>
              <p className="text-muted-foreground">Напишите нам в Discord или Telegram</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center mx-auto mb-4 neon-border">
                <Icon name="CreditCard" size={40} className="text-secondary" />
              </div>
              <h4 className="text-xl font-bold mb-2 font-orbitron">2. Оплатите</h4>
              <p className="text-muted-foreground">Переведите сумму любым способом</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-4 neon-border">
                <Icon name="Package" size={40} className="text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-2 font-orbitron">3. Получите</h4>
              <p className="text-muted-foreground">Товар доставим на сервере в течение 10 минут</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-8 text-center neon-glow font-orbitron">КОНТАКТЫ И СПОСОБЫ СВЯЗИ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Icon name="Server" className="text-primary" size={24} />
                  IP Сервера
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary font-mono">play.mysteryworld.ru</p>
                <p className="text-muted-foreground mt-2">Версия: 1.20.1 (Java Edition)</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur border-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Icon name="MessageCircle" className="text-secondary" size={24} />
                  Discord
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-secondary">MysteryShop#1234</p>
                <p className="text-muted-foreground mt-2">Быстрые ответы 24/7</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur border-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Icon name="Send" className="text-accent" size={24} />
                  Telegram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-accent">@mysteryworld_shop</p>
                <p className="text-muted-foreground mt-2">Поддержка и заказы</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Icon name="Mail" className="text-primary" size={24} />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">shop@mysteryworld.ru</p>
                <p className="text-muted-foreground mt-2">Официальные запросы</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-8 text-center neon-glow font-orbitron">ОТЗЫВЫ ПОКУПАТЕЛЕЙ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Steve2005', rating: 5, text: 'Купил незеритовую броню, доставили за 5 минут! Отличный сервис!' },
              { name: 'Creeper_King', rating: 5, text: 'Лучшие цены на сервере, товар всегда в наличии. Рекомендую!' },
              { name: 'DiamondMiner', rating: 5, text: 'Заказывал элитры с зачарованиями, всё пришло как обещали. Топ!' },
            ].map((review, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-orbitron">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-8 text-center neon-glow font-orbitron">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h3>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1" className="border-primary/30">
              <AccordionTrigger className="text-lg font-orbitron hover:text-primary">
                Как быстро доставляется товар?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Обычно доставка занимает от 5 до 15 минут после подтверждения оплаты. В редких случаях может потребоваться до 30 минут.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-primary/30">
              <AccordionTrigger className="text-lg font-orbitron hover:text-primary">
                Какие способы оплаты принимаете?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Принимаем переводы на карту Сбербанка, ЮMoney, QIWI, а также криптовалюту (BTC, ETH, USDT).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-primary/30">
              <AccordionTrigger className="text-lg font-orbitron hover:text-primary">
                Есть ли гарантия на товар?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да! Мы гарантируем качество всех товаров. Если вы получили не то, что заказывали, мы заменим товар или вернём деньги.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-primary/30">
              <AccordionTrigger className="text-lg font-orbitron hover:text-primary">
                Можно ли купить товар в рассрочку?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Для постоянных клиентов возможна рассрочка на крупные покупки (от 10000₽). Свяжитесь с нами для уточнения условий.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-primary/30 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold neon-glow font-orbitron mb-4">MYSTERYWORLD SHOP</h2>
          <p className="text-muted-foreground mb-4">Лучший магазин на сервере MysteryWorld</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="border-primary hover:bg-primary hover:text-primary-foreground">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="border-secondary hover:bg-secondary hover:text-secondary-foreground">
              <Icon name="Send" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="border-accent hover:bg-accent hover:text-accent-foreground">
              <Icon name="Mail" size={20} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">© 2024 MysteryWorld Shop. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
