using System;
using System.Threading;

namespace FoodChooser.Services
{
    public class RandomNumberGenerator : IRandomNumberGenerator
    {
        private readonly Random _random;

        public RandomNumberGenerator()
        {
            _random = new Random((int)DateTime.Now.Ticks & 0x0000FFFF);
        }

        public int GetRandomNumber(int max)
        {
            Thread.Sleep(20);
            return _random.Next(0, max);
        }
    }
}
