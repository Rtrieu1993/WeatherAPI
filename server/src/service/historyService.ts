import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4(); // Generate a unique id
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {

      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf-8');
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(cityName);
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }

}

export default new HistoryService();
