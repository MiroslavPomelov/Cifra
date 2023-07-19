using Turniket4;

BusTicket ticket1 = new BusTicket(1, DateOnly.Parse("31.12.2023"), TypeOfTicket.Разовый, true);
BusTicket turnilet = new BusTurnilet();
turnilet.IsValid(DateOnly.FromDateTime(DateTime.Now), ticket1)
