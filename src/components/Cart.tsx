import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
}

const Cart = ({ items, onRemoveItem, onUpdateQuantity, onClearCart }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = item.discount 
      ? Math.round(item.price * (1 - item.discount / 100))
      : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground relative">
          <Icon name="ShoppingCart" className="mr-2" size={18} />
          Корзина
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-card border-primary/50">
        <SheetHeader>
          <SheetTitle className="text-2xl font-orbitron neon-glow flex items-center gap-2">
            <Icon name="ShoppingCart" className="text-primary" size={28} />
            КОРЗИНА
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${totalItems}`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Icon name="ShoppingBag" size={80} className="text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">Добавьте товары в корзину</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => {
                  const itemPrice = item.discount 
                    ? Math.round(item.price * (1 - item.discount / 100))
                    : item.price;
                  
                  return (
                    <div key={item.id} className="bg-card/50 border border-primary/30 rounded-lg p-4 animate-fade-in">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold font-orbitron text-lg">{item.name}</h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-xl font-bold text-primary font-orbitron">
                              {itemPrice}₽
                            </span>
                            {item.discount && (
                              <span className="text-sm text-muted-foreground line-through">
                                {item.price}₽
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/20"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-background/50 rounded-lg border border-primary/30">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/20"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-bold font-orbitron">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/20"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-accent font-orbitron">
                            {itemPrice * item.quantity}₽
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 space-y-4">
                <Separator className="bg-primary/30" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-orbitron">ИТОГО:</span>
                  <span className="text-3xl font-bold text-primary font-orbitron neon-glow">
                    {totalPrice}₽
                  </span>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 neon-border"
                  onClick={() => {
                    alert(`Заказ на ${totalPrice}₽ оформлен! Свяжитесь с нами для оплаты.`);
                    setIsOpen(false);
                  }}
                >
                  <Icon name="Zap" className="mr-2" size={20} />
                  Оформить заказ
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    if (confirm('Очистить корзину?')) {
                      onClearCart();
                    }
                  }}
                >
                  <Icon name="Trash2" className="mr-2" size={18} />
                  Очистить корзину
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
