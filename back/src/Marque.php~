<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Marque
 *
 * @ORM\Table(name="MARQUE")
 * @ORM\Entity
 */
class Marque
{
    /**
     * @var int
     *
     * @ORM\Column(name="idMarque", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmarque;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=256, nullable=false)
     */
    private $nom;


    /**
     * Get idmarque.
     *
     * @return int
     */
    public function getIdmarque()
    {
        return $this->idmarque;
    }

    /**
     * Set nom.
     *
     * @param string $nom
     *
     * @return Marque
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom.
     *
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }
}
