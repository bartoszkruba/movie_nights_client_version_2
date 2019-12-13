import React, {Component} from 'react';


class InfoPage extends Component {

  render() {
    return <div className="mb-5 mt-5">
      <div className="row">
        <div className="col-8 m-auto">
          <h2>OAuth2</h2>
          <p>OAuth2 är en authorization metod baserad på OpenID autentisering standard. OpenID är en autentiserings
            protokol som låter dig logga in till nya websidor via en av dina existerande konto från andra leverantörer.
            Exempelvis kan du an­vända användarnamn och lösen­ord för Facebook för att logga in på en annan tjänst. Den
            största fördelen med OpenID är att du behöver inte dela ditt lösenord med andra websidor och inloggning
            istället baseras på en identitet bekräftelse skickad från OpenID leverantör.</p>
          <p>För att kunna använda OpenID för autentisering hos nya webservices först måste man äga konto hos någon av
            leverantörer som erbjuder OpenID autentisering tjänst (exempelvis google, facebook eller github). Därefter,
            när man ska skapa ett konto på något nytt websida kan man istället välja att bli autentiserad via OAuth2
            protokol. Istället för att behöva skapa nytt konto och ange sitt lösenord blir man redirectad till OAuth2
            leverantörets hemsida (exemeplvis google) vilket ber dig om bekräftelse. Leverantören kommer be dig om
            tillstånd för att komma åt din kontos olika resurser (få tillgång till dina personliga information, email,
            kalender etc.). Efter din bekräftelse blir du redirectad tillbaka till hemsidan och levantören kommer skicka
            response som bekräftar din identiet. Ofta skickas det också en acces token med vilket kan få tillgång till
            ditt konto olika resurser (få tillgång till email, kalender etc.).</p>
        </div>
      </div>
      <div className="row">
        <div className="col-8 m-auto">
          <h2>JWT</h2>
          <p>JWT står för JSON Web Token. Det är ett öppet standard för hur kan man säkert överföra JSON objekt via
            internet. JWT kan bli signerad med public/private key pairs vilket säkerställer användarens identitet. Det
            mest pupulär anvädningsområde för JWT är autentisering. Server genererar ett unikt web token vid inloggning
            och skickar den till användaren. Token innehåller information om användarens identitet. Användaren kan
            skicka JWT vid framtida anrop för att bekräfta sitt identiet och få åtkomst åt servers resurser. </p>
          <p>JSON Web Token består <b>Header</b>, <b>Payload</b> och <b>Signature</b>.</p>
          <h5>Header</h5>
          <p>JWT header oftast består av två delar: typen av token, vilket är JWT och typen av krypterings algoritm
            vilket används för att generera Signature. Header en JSON objekt omvandlat till en Base64Url sträng.</p>
          <h5>Payload</h5>
          <p>Payload består av så kallade claims vilket är data om en entitet (oftast användaren) eller något annat
            information. Claims kan exempelvis innehålla användarens username, role eller id. Payload omvandlas också
            till Base64Url</p>
          <h5>Signature</h5>
          <p>Signature säkerställer att meddelandet har inte blivit modifierad på vägen och den berkäftar
            avsändarens identiet. För att signera en JWT behöver man en “secret”. Secret är en sträng som säkerställer
            att signeringen kan inte återskapas av något annat service eller användare. Secret brukar bli en lång följd
            av
            tecken som är svårt att gissa fram och den hålls hemligt. Man genererar signature genom att passera header,
            payload och secret via en krypteringsalgoritm. Server generar sitt eget signering och jämför den med skickad
            meddelande för att säkerstella att token blev inte modifierad på vägen. Eftersom det är endast servern som
            har tillgång till secret så kan inte någon annan generera en giltig signature.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-8 m-auto">
          <h2>HTTPS</h2>
          <p>HTTPS fungerar på exakt samma sätt som vanlig HTTP. Det enda skillnaden är att HTTPS krypterar meddelande
            med SSL/TLS. Om din webläsaren pratar med en server via en vanlig HTTP så kan vem som hälst komma åt
            meddelande och även modifiera de. Om du sitter I en cafeteria kopplat till publik nätverk och använder en
            webbsida som inte implementerar HTTPS så kan en hacker kopplas in till samma Wifi och stjäla
            dina autentiseringsinformation. </p>
          <p>HTTPS säkerställer att det är endast avsändare och avläsare som kan få tillgång till meddelandet. Detta
            uppnås via användning av så kallade private/public keys. För att client och servern ska kunna skicka
            information till varandra måste de först skicka Public Keys. Public Key kan användas för att kryptera
            informationen men när kryptering har blivit färdig så går det inte att läsa av meddelandet med samma
            nyckeln. Varje Public Key har en motsvarande Private Key vilket kan man använda för att läsa av meddelandet
            och avläsaren skickar aldrig Private Key till någon. Eftrsom private key är det ända sättet att läsa av
            informationen och den skickas aldrig via internet så kan ingen förutom avläsaren få tillgång till
            informationen.</p>
          <p>För att en webbplats ska kunna betraktas som säkert måste den ha en SSL Certificate. SSL Certifacate är en
            fil som innehåller information om bland annat ägarens namn och domän. Den säkerställer att webbplatsen
            faktisk anväden SSL protokol. För att kunna få ett SSL certifikat får sin webbsida måste man kontakta en av
            organisationer som har rätt till att utfärda den. Dessa organisationerna kommer inspektera webbplatsen och
            säkerställa att webbsidan faktisk implementerar SSL protokol på ett korrekt sätt. När webbläsaren kommer I
            kontakt med en av SSL certifierade webbsida så kollar den webbsidans signerade certifikat och kontrollerar
            att den är giltig. Dessa signeringar är också krypterat med public/private keys så att det finns ingen sätt
            att förbereda en falsk certifikat.</p>
        </div>
      </div>
    </div>
  }

}

export default InfoPage