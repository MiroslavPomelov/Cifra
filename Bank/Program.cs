using Bank;

Schet schet = new Schet(123456);
schet.Summa = 0;
Card card = new Card("Сбер", 1567, schet);
Client client = new Client() { FIO = "Ivanov I.I", ClientCard = card };
client?.ClientCard?.Add(35000);
Order order = new Order() { Client = client, Name = "Comp", Total = 30000 };
order?.Client?.ClientCard?.Sub(order.Total);
client?.ClientCard?.SchetCard?.Print();
Admin admin = new Admin() { Name = "Petrov P.P" };
admin.BlockCard(client?.ClientCard!);
order?.Client?.ClientCard?.Sub(200);


