#include <WiFi.h>
#include <PubSubClient.h>
#include <HCSR04.h>

// CONFIGURAÇÃO

double updateDelay = 5; // seconds

// Variáveis para o sensor

TaskHandle_t tarefa3;

int trigPin = 26;
int echoPin = 27;
int trigPin2 = 32;
int echoPin2 = 33;
UltraSonicDistanceSensor distanceSensor1(trigPin, echoPin, 5000);
UltraSonicDistanceSensor distanceSensor2(trigPin2, echoPin2, 5000);
  
// Variáveis globais da lixeira
char canId[] = "62bf1a49d694a13c4a45550f";
double alturaTotal = 47;
double sensorOffset = 0;

// Variáveis para conexão

char *mqttServer = "test.mosquitto.org";
int mqttPort = 1883;
const char* ssid  = "moto g(30)";
const char* password = "Scoobydoo123321";


// Wifi
WiFiClient wifiClient;
WiFiServer server(80);

void connectWifi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// MQTT
PubSubClient mqttClient(wifiClient); 

void setupMQTT() {
  mqttClient.setServer(mqttServer, mqttPort);
}

void reconnect() {
  Serial.println("Connecting to MQTT Broker...");
  while (!mqttClient.connected()) {
      Serial.println("Reconnecting to MQTT Broker..");
      String clientId = "ESP32Client-";
      clientId += String(random(0xffff), HEX);
      
      if (mqttClient.connect(clientId.c_str())) {
        Serial.println("Connected to broker.");
        // subscribe to topic
      }   
  }
}

// UTILS

void blinkLed() {
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);
  delay(1000);
}

void showStatus(double d1, double d2, double media) {
  Serial.println("Altura 1: ");
  Serial.println(d1);
  Serial.println("Altura 2: ");
  Serial.println(d2);

  Serial.println("\nMedia: ");
  Serial.println(media);
}


// MAIN
void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode (trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode (trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);

  xTaskCreatePinnedToCore(sensorHC, "tarefa3", 10000, NULL, 1, &tarefa3, 0);

  connectWifi();
  setupMQTT();

  server.begin();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    blinkLed();
  }

  if (!mqttClient.connected())
    reconnect();
  mqttClient.loop();

}


void sensorHC(void *pvParameters) {
  while (1) {
    // Lendo distâncias
    double distancia = distanceSensor1.measureDistanceCm() - sensorOffset;
    double distancia2 = distanceSensor2.measureDistanceCm() - sensorOffset;
    
    // Interpretando distâncias
    double distanciaMedia = (distancia + distancia2) / 2;
    double ocupacao = 1 - distanciaMedia / alturaTotal;
  
    showStatus(distancia, distancia2, distanciaMedia);
  
    // Validando e registrando dados
    if (ocupacao >= 0 && ocupacao <= 1) {
      char *topic = "SmartTrash/can";
      
      char message[35];
      strcpy(message, canId);
      sprintf(message, "%s %.2f", canId, ocupacao);
      
      mqttClient.publish(topic, message);
    }
  
    delay(updateDelay * 1000);
    
  }
 }
