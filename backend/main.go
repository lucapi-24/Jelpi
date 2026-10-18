package main

import (
	"fmt"
	"log"
	"bufio"
	"os"
)

func main() {
	edad := bufio.NewScanner(os.Stdin)
	fmt.Print("Ingrese su edad: ")
	edad.Scan()
	edadInput := edad.Text()

	// Convertir la edad a un entero
	var edadInt int
	_, err := fmt.Sscanf(edadInput, "%d", &edadInt)
	if err != nil {
		log.Fatalf("Error al convertir la edad: %v", err)
	}
}