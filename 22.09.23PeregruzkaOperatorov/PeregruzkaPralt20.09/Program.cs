namespace PeregruzkaPralt20._09
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Matrix mat1 = new Matrix();
            mat1.matrix = new int[3, 3] {
                {1,2,3 },
                {4,5,6 },
                {7,8,9 }
            };

            mat1.matrix2 = new int[3, 3] {
                {1,2,3 },
                {4,5,6 },
                {7,8,9 }
            };
            int[,] array = mat1 - mat1;

            for (int i = 0; i < array.GetLength(0); i++)
            {
                for (int j = 0; j < array.GetLength(1); j++)
                {
                    Console.Write(array[i, j] + " ");
                }
                Console.WriteLine();
            }
        }
    }

    class Matrix
    {
        public int[,] matrix = new int[3, 3];

        public int[,] matrix2 = new int[3, 3];

        public static int[,] operator +(Matrix matrix, Matrix matrix2)
        {
            int[,] matrixResult = new int[3, 3];

            for (int row = 0; row < matrixResult.GetLength(0); row++)
            {
                for (int columns = 0; columns < matrixResult.GetLength(1); columns++)
                {
                    matrixResult[row, columns] = matrix.matrix[row, columns] + matrix2.matrix2[row, columns];
                }
            }
            return matrixResult;
        }

        public static int[,] operator -(Matrix matrix, Matrix matrix2)
        {
            int[,] matrixResult = new int[3, 3];

            for (int row = 0; row < matrixResult.GetLength(0); row++)
            {
                for (int columns = 0; columns < matrixResult.GetLength(1); columns++)
                {
                    matrixResult[row, columns] = matrix.matrix[row, columns] - matrix2.matrix2[row, columns];
                }
            }
            return matrixResult;
        }

        public static int[,] operator *(Matrix matrix, Matrix matrix2)
        {
            int[,] matrixResult = new int[3, 3];

            for (int row = 0; row < matrixResult.GetLength(0); row++)
            {
                for (int columns = 0; columns < matrixResult.GetLength(1); columns++)
                {
                    matrixResult[row, columns] = matrix.matrix[row, columns] * matrix2.matrix2[row, columns];
                }
            }
            return matrixResult;
        }

    }

}
