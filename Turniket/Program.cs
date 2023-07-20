using Turniket;

BusTicket ticket1 = new BusTicket(1, DateOnly.Parse("31.12.2023"), TypeOfTicket.Разовый, true);
BusTurniket turniket = new BusTurniket();
turniket.IsValid(DateOnly.FromDateTime(DateTime.Now), ticket1);
turniket.IsValid(DateOnly.FromDateTime(DateTime.Now), ticket1);
BusTicket ticket2 = new BusTicket(1, DateOnly.Parse("18.07.2023"), TypeOfTicket.Проездной, true);
turniket.IsValid(DateOnly.FromDateTime(DateTime.Now), ticket2);

