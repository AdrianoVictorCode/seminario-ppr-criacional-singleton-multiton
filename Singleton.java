public class Singleton {
    // Instância única
    private static Singleton instance;

    // Construtor privado impede criação externa
    private Singleton() {
        System.out.println("Instância Singleton criada!");
    }

    // Método público para obter a única instância
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    public void showMessage() {
        System.out.println("Olá do Singleton!");
    }

    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();

        s1.showMessage();

        // Verifica se ambas as instâncias são iguais
        System.out.println(s1 == s2); // true
    }

}