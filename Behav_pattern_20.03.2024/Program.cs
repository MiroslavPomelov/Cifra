namespace Behav_pattern_20._03._2024
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Architect architect = new Architect();
            Builder builder = new Builder();
            Electric electric = new Electric();
            Otdelok otdelok = new Otdelok();

            architect.Register(builder);
            builder.Register(electric);
            electric.Register(otdelok);

            architect.ApproveExpense(Console.ReadLine());
        }
    }

    public enum Access
    {
        Yes, No
    }

    public interface ExpenseBase
    {
        public Access ApproveExpense(string stroke);
        public void Register(ExpenseBase baseInterface);
    }

    public abstract class ExpenseBaseClass : ExpenseBase
    {
        public ExpenseBase _nextHandler;

        public virtual Access ApproveExpense(string stroke)
        {
            if (_nextHandler != null)
            {
                return _nextHandler.ApproveExpense(stroke);
            }
            else
            {
                return Access.No;
            }
        }

        public void Register(ExpenseBase baseInterface) => _nextHandler = baseInterface;

    }

    public class Architect : ExpenseBaseClass
    {
        public override Access ApproveExpense(string stroke)
        {
            //if (stroke == "Оформить чертеж")
            //{
            //    return Access.Yes;
            //}
            //else
            //{
            //    return base.ApproveExpense(stroke);
            //}

            switch (stroke)
            {
                case "Оформить чертеж":
                    return Access.Yes;
                    break;
                case "Составить план здания":
                    return Access.Yes;
                    break;
                default:
                    return base.ApproveExpense(stroke);
                    break;
            }
        }
    }

    public class Builder : ExpenseBaseClass
    {
        public override Access ApproveExpense(string stroke)
        {
            switch (stroke)
            {
                case "Залить фундамент":
                    return Access.Yes;
                    break;
                case "Возвести стены":
                    return Access.Yes;
                    break;
                case "Уложить кровлю":
                    return Access.Yes;
                    break;
                default:
                    return base.ApproveExpense(stroke);
                    break;
            }
        }
    }

    public class Electric : ExpenseBaseClass
    {
        public override Access ApproveExpense(string stroke)
        {
            switch (stroke)
            {
                case "Монтаж электропроводки":
                    return Access.Yes;
                    break;
                case "Монтаж электрооборудования":
                    return Access.Yes;
                    break;
                case "Монтаж розеток":
                    return Access.Yes;
                    break;
                case "Монтаж осветительных приборов":
                    return Access.Yes;
                    break;
                default:
                    return base.ApproveExpense(stroke);
                    break;
            }
        }
    }

    public class Otdelok : ExpenseBaseClass
    {
        public override Access ApproveExpense(string stroke)
        {
            switch (stroke)
            {
                case "Заливка полов":
                    return Access.Yes;
                    break;
                case "Облицовка стен":
                    return Access.Yes;
                    break;
                case "Покраска":
                    return Access.Yes;
                    break;
                case "Поклейка обоев":
                    return Access.Yes;
                    break;
                case "Установка дверей":
                    return Access.Yes;
                    break;
                case "Монтаж оконных рам":
                    return Access.Yes;
                    break;
                default:
                    return base.ApproveExpense(stroke);
                    break;
            }
        }
    }
}